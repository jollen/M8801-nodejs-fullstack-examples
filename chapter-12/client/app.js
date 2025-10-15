(function(){
  // -------- Config --------
  let API_BASE = document.getElementById('apiBase').value;
  const setApiBase = () => {
    API_BASE = document.getElementById('apiBase').value.trim().replace(/\/$/, '');
    status('API_BASE 設為 ' + API_BASE);
  };
  document.getElementById('applyBase').addEventListener('click', setApiBase);

  function status(msg){ const el = document.getElementById('status'); el.textContent = msg; setTimeout(()=> el.textContent='', 1500); }

  // -------- Backbone: Model & Collection --------
  const Message = Backbone.Model.extend({
    urlRoot: function(){ return API_BASE + '/discussions'; },
    idAttribute: 'id',
    defaults: { message: '', timestamp: null }
  });

  const Messages = Backbone.Collection.extend({
    model: Message,
    url: function(){ return API_BASE + '/discussions'; },
    parse: function(resp){ return resp; }
  });

  // -------- Views --------
  const ComposeView = Backbone.View.extend({
    tagName: 'section',
    className: 'compose',
    template: _.template(document.getElementById('tpl-compose').innerHTML),
    events: {
      'click .btn-save': 'save',
      'click .btn-clear': 'clear'
    },
    initialize: function(opts){ this.router = opts.router; },
    render: function(){ this.$el.html(this.template({})); return this; },
    clear: function(){ this.$('input[name="message"]').val(''); },
    async save(){
      try {
        const msg = this.$('input[name="message"]').val().trim();
        if (!msg) return;
        const m = new Message({ message: msg });
        await m.save(); // POST
        status('已建立 #' + m.get('id'));
        this.router.navigate('list', { trigger: true });
      } catch (e) {
        alert('儲存失敗：' + (e?.responseJSON?.detail || e?.statusText || e?.message));
      }
    }
  });

  const ItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'item',
    template: _.template(document.getElementById('tpl-item').innerHTML),
    initialize: function(){ this.listenTo(this.model, 'change', this.render); },
    render: function(){ this.$el.html(this.template(this.model.toJSON())); return this; }
  });

  const ListView = Backbone.View.extend({
    tagName: 'section',
    className: 'list-page',
    template: _.template(document.getElementById('tpl-list').innerHTML),
    events: { 'click .btn-reload': 'reload', 'change #autoRefresh': 'toggleAuto' },
    initialize: function(opts){
      this.collection = new Messages();
      this.timer = null;
    },
    remove: function(){ if (this.timer) clearInterval(this.timer); Backbone.View.prototype.remove.call(this); },
    render: function(){
      this.$el.html(this.template({}));
      this.$list = this.$('.list');
      this.reload();
      return this;
    },
    async reload(){
      const limit = parseInt(this.$('input[name="limit"]').val() || '8', 10);
      await this.collection.fetch({ data: { limit } });
      this.$list.empty();
      this.collection.each(m => { const v = new ItemView({ model: m }); this.$list.append(v.render().el); });
      status('已載入最新 ' + limit + ' 筆');
    },
    toggleAuto(){
      const checked = this.$('#autoRefresh').prop('checked');
      if (checked){
        this.timer = setInterval(() => this.reload().catch(()=>{}), 5000);
      } else {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
      }
    }
  });

  // -------- Router --------
  const AppRouter = Backbone.Router.extend({
    routes: {
      '': 'list',
      'list': 'list',
      'compose': 'compose'
    },
    initialize: function(opts){ this.$root = opts.$root; },
    mount(view){ if (this.view) this.view.remove(); this.view = view; this.$root.html(view.render().el); },
    list(){ this.mount(new ListView({})); },
    compose(){ this.mount(new ComposeView({ router: this })); }
  });

  // -------- Bootstrap app --------
  $(function(){
    setApiBase();
    const router = new AppRouter({ $root: $('#app') });
    Backbone.history.start();
  });
})();

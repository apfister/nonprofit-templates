import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    const session = this.get('session');
    if (!session.get('isAuthenticated')){
      this.transitionTo('signin');
    }
  }
});

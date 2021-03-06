import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({

  intl: Ember.inject.service(),

  beforeModel() {

    const intl = this.get('intl');

    let defaultLocale = 'en-us';

    intl.setLocale(defaultLocale);

    const isAuthenticated = this.get('session.isAuthenticated');

    console.log('beforeModel', isAuthenticated);

  },

  actions: {
    signin() {
      this.transitionTo('signin');
    },
    signout() {
      // depending on the type of auth, we need to do different things
      if (ENV.torii.providers['arcgis-oauth-bearer'].display && ENV.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
        // redirect the window to the signout url
        window.location = this.get('session.signoutUrl');
      } else {
        this.get('session').close();
      }
    },

    accessDenied() {
      this.transitionTo('signin');
    }
  }

});

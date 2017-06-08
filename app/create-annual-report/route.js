import Ember from 'ember';
// import MapJournal from 'nonprofit-templates/storymap-templates/map-journal';
import ENV from 'nonprofit-templates/config/environment';

export default Ember.Route.extend({

  itemsService: Ember.inject.service(),

  mapJournalTemplate: Ember.inject.service(),

  actions: {
    createStoryMap: function () {
      const itemsService = this.get('itemsService');

      // let data = {"values":{"settings":{"appGeocoders":[{"singleLineFieldName":"SingleLine","name":"Esri World Geocoder","url":"http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"}],"layout":{"id":"side"}},"title":"Annual Report","story":{"storage":"WEBAPP","sections":[{"title":"<span style=\"font-size: 40px;\">Annual Report</span>","content":"<p>Side Panel Text</p>\n","contentActions":[],"creaDate":1496362382843,"pubDate":1496362382843,"status":"PUBLISHED","media":{"type":"webpage","webpage":{"url":"https://www.esri.com","type":"webpage","display":"fit","unload":true}}}]},"template":{"name":"Map Journal","createdWith":"1.10.2","editedWith":"1.10.2"}}};

      const mapJournalTemplate = this.get('mapJournalTemplate');

      let data = mapJournalTemplate.get('template');

      const username = this.get('session.currentUser.username');

      let item = {};
      item.owner = username;
      item.type = 'Web Mapping Application';
      item.typeKeywords = ['JavaScript,Map,Mapping Site,Online Map,Ready To Use,selfConfigured,Web Map,Story Map,Story Maps,MapJournal,layout-side'];
      item.tags = ['Story Map,Map Journal'];
      item.overwrite = true;
      item.commentsEnabled = true;
      item.title = 'Annual Report';
      item.text = JSON.stringify(data);

      itemsService.create(item)
        .then( (response) => {
          console.log('success', response);

          if (response.success) {
            const itemId = response.id;

            const portalKey = this.get('session.portal.urlKey');

            const itemUrl = `http://${portalKey}.maps.arcgis.com/apps/MapJournal/index.html?appid=${itemId}`;

            item.url = itemUrl;
            item.id = itemId;

            // update call
            itemsService.update(item)
              .then( (response) => {
                // console.log('success updating item', itemUrl);
                Ember.$('#successMessage').html(`Sucess!! <a href="${itemUrl}" target="_blank">View Story Map!</a>`);
              }, (error) => {
                console.log('error updating', error);
              });
          }

        }, (error) => {
          console.log('error');
        });
    }
  },

  beforeModel() {
    const session = this.get('session');
    if (!session.get('isAuthenticated')){
      this.transitionTo('signin');
    }
  }
});

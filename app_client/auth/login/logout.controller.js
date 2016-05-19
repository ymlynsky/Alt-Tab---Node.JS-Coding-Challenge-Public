(function () {

  angular
  .module('meanApp')
  .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', 'authentication'];
  function logoutCtrl($location, authentication) {
    var vm = this;
    authentication
      .logout()
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('');
      });
  }

})();
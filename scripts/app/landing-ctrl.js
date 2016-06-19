angular.module('PersonalManager').controller('LandingCtrl', function($scope, $state, $mdDialog) {
   
	$scope.onNewBoardClick = function () {

		var confirm = $mdDialog.prompt()
			.title('Create Board')
			.placeholder('Board name')
			.ariaLabel('Board name')
			.targetEvent(event)
			.ok('Enter Board')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function(boardName) {
			if (!boardName || boardName == 0) {
				return;
			}
			$state.go('board', {
				id: boardName
			})
		}, angular.noop);
		
	};
});
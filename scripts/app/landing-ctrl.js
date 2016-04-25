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

	$scope.tasks = [
		'Create and name a board',
		'Create/Update/Delete one or more lists within a board',
		'Create/Update/Delete one or more cards within a list',
		'Rearrange the cards (Drag & Drop). A small bug exists while drag and drop, one card from list gets deleted'
	];
});
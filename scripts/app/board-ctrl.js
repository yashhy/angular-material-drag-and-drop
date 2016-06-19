angular.module('PersonalManager').controller('BoardCtrl', 
  function($scope, $mdDialog, $http, $stateParams) {
    init();

    function init() {

      $scope.boardName = $stateParams.id;

      var url = './data/board-new.json';
      if ($scope.boardName == 0) {
          $scope.boardName = 'Existing Board';
          url = './data/board-existing.json';        
      }

      getBoards(url).then(function (response) {
        $scope.boards = response.data;
      });
    }
    
    function getBoards(url) {
      return $http.get(url);
    }    

    $scope.dragOptions = {
      opacity: 0.50,
      revert: function () {
        $(this).css({'top': '0px', 'left':'0px'});
        return false;
      },
      revertDuration: 2500
    };

    $scope.dropOptions = {
      hoverClass: 'drop-hover'
    };

    $scope.onListEdit = function (event, index) {
      var confirm = $mdDialog.prompt()
          .title('Edit list name')
          .placeholder('List name')
          .ariaLabel('List name')
          .targetEvent(event)
          .ok('Change')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function(listName) {
        if (!listName) {
          return;
        }
        $scope.boards[index].name = listName;
      }, angular.noop);
    };

    $scope.onListDelete = function(event, index) {
      var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Do you want to delete  List ' + (index + 1))
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');

      $mdDialog.show(confirm).then(function() {
        for (var i = 0; i < $scope.boards.length; i++) {
             if (i === index) {           
                var end = index === 0 ? index + 1 : 1;
                $scope.boards.splice(index, end);
                break;
             }
        }
      }, angular.noop);

    };

    $scope.onAddListClick = function () {
      var list =  getList();
      $scope.boards.push(list);
    };

    function getList() {
      var id = $scope.boards[$scope.boards.length - 1].id + 1,
          list = {
            id: id,
            name: 'List ' + id,
            isVisible: true,
            cards: []
          };

      return list;
    }

    $scope.onAddCardClick = function (event, index) {
      
      $scope.cardDialog = getCard(index);
      $scope.isCardEdit = false;

      $mdDialog.show({
        controller: DialogController,
        scope: $scope,
        templateUrl: './views/add-card.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        preserveScope: true
      })
      .then(function(card) {
        $scope.boards[index].cards.push(card);
      }, angular.noop)
      .finally(function () {
        delete $scope.card;
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.card = angular.extend({}, $scope.cardDialog);
      $scope.singleComment = {
        text: ''
      };
      
      $scope.cancel = $mdDialog.cancel;

      $scope.onAddCommentClick = function () {
        var comment = angular.extend($scope.singleComment, { date: Date.now()});
        $scope.card.comments = $scope.card.comments || [];
        $scope.card.comments.push(comment);
        $scope.singleComment = {
          text: ''
        };
      };

      $scope.insertCard = function() {
        $mdDialog.hide($scope.card);
      };
    }

    function getCard(index) {
      var board = $scope.boards[index];
          card = {
              id: board.cards.length + 1,
              title: 'Card ' + (board.id) + '.' + (board.cards.length + 1),
              desc: 'I\'m card ' + (board.cards.length + 1) + ' with descirption.',
              comments: []
          };
      return card;
    }

    $scope.onEditCardClick = function (event, parentIndex, card, index) {
      $scope.cardDialog = card;
      $scope.isCardEdit = true;

      $mdDialog.show({
        controller: DialogController,
        scope: $scope,
        templateUrl: './views/add-card.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        preserveScope: true
      })
      .then(function (updatedCard) {
        var cards = $scope.boards[parentIndex].cards;
        for (var i = 0; i < cards.length; i++) {
            if (i === index) {
              cards[i] = updatedCard;
              break;
            }
        }
      }, angular.noop)
      .finally(function () {
        delete $scope.card;
      });
    };

    $scope.onDeleteCardClick = function (event, parentIndex, index) {
      var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Do you want to delete this card?')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');

      $mdDialog.show(confirm).then(function() {
        var board = $scope.boards[parentIndex];
        for (var i = 0; i < board.cards.length; i++) {
             if (i === index) {           
                var end = index === 0 ? index + 1 : 1;
                board.cards.splice(index, end);
                break;
             }
        }
      }, angular.noop);
    };

});
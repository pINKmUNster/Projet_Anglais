angular.module('directives', [])
    .directive("drag", ['$rootScope', function ($rootScope) {

        function dragStart(evt, element, dragStyle) {
            element.addClass(dragStyle);
            evt.originalEvent.dataTransfer.setData("id", evt.target.id);
            evt.originalEvent.dataTransfer.effectAllowed = 'move';
        };
        function dragEnd(evt, element, dragStyle) {
            element.removeClass(dragStyle);
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$set('draggable', 'true');
                scope.dragData = scope[attrs["drag"]];
                scope.dragStyle = attrs["dragstyle"];
                element.bind('dragstart', function (evt) {
                    $rootScope.draggedElement = scope.dragData;
                    dragStart(evt, element, scope.dragStyle);
                });
                element.bind('dragend', function (evt) {
                    dragEnd(evt, element, scope.dragStyle);
                });
            }
        }
    }])

    .directive("drop", ['$rootScope', function ($rootScope) {

        function dragEnter(evt, element, dropStyle) {
            evt.preventDefault();
            element.addClass(dropStyle);
        };
        function dragLeave(evt, element, dropStyle) {
            element.removeClass(dropStyle);
        };
        function dragOver(evt) {
            evt.preventDefault();
        };
        function drop(evt, element, dropStyle) {
            evt.preventDefault();
            element.removeClass(dropStyle);
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.dropData = scope[attrs["drop"]];
                scope.dropStyle = attrs["dropstyle"];
                element.bind('dragenter', function (evt) {
                    dragEnter(evt, element, scope.dropStyle);
                });
                element.bind('dragleave', function (evt) {
                    dragLeave(evt, element, scope.dropStyle);
                });
                element.bind('dragover', dragOver);
                element.bind('drop', function (evt) {
                    drop(evt, element, scope.dropStyle);
                    $rootScope.$broadcast('dropEvent', $rootScope.draggedElement, scope.dropData);
                });
            }
        }
    }])
   /* .directive('dragEvent', ['$parse', function($parse) {
        return function(scope, element, attrs) {
            element.bind("dragstart", function (evt) {
                var id = element.attr("id");
                evt.originalEvent.dataTransfer.setData("drag-id", id);

                var fn = $parse(attrs.dragEvent);
                fn(scope, {$element : element});
            });
            element.attr("draggable", true);
        }
    }])
    .directive('dropEvent', ['$parse', function($parse) {
        return function(scope, element, attrs) {
            element.bind("dragover dragenter", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                return false;
            });

            element.bind("drop", function (evt) {
                var id = evt.originalEvent.dataTransfer.getData("drag-id");
                var elementTransfer = angular.element(document.getElementById(id));
                element.append(elementTransfer);

                evt.stopPropagation();
                evt.preventDefault();

                var fn = $parse(attrs.dropEvent);
                fn(scope, {$element : elementTransfer, $to : element});
            });
        }
    }]);
*/

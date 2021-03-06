(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['knockout', 'jquery', 'koco-disposer'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('knockout'), require('jquery'), require('koco-disposer'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.knockout, global.jquery, global.kocoDisposer);
        global.select2BindingHandler = mod.exports;
    }
})(this, function (_knockout, _jquery, _kocoDisposer) {
    'use strict';

    var _knockout2 = _interopRequireDefault(_knockout);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _kocoDisposer2 = _interopRequireDefault(_kocoDisposer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    //TODO: Faire en sorte que ce binding applique implicitement les bindings de "options"
    _knockout2.default.bindingHandlers.select2 = {
        init: function init(element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey,
                select2Options = allBindings.select2Options,
                select2SelectedOption = allBindings.select2SelectedOption,
                options = allBindings.options,
                value = allBindings.value,
                $element = (0, _jquery2.default)(element);

            $element.select2(obj);

            var koDisposer = new _kocoDisposer2.default();

            _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
                koDisposer.dispose();
            });

            if (options && _knockout2.default.isObservable(options)) {
                koDisposer.add(options.subscribe(function () {
                    $element.removeClass('select2-offscreen').select2(obj);
                }));
            }

            if (value && _knockout2.default.isObservable(value)) {
                koDisposer.add(value.subscribe(function () {
                    $element.removeClass('select2-offscreen').select2(obj);
                }));
            }

            if (select2Options && _knockout2.default.isObservable(select2Options)) {
                koDisposer.add(select2Options.subscribe(function () {
                    $element.removeClass('select2-offscreen').select2(obj);
                }));
            }

            if (select2SelectedOption && _knockout2.default.isObservable(select2SelectedOption)) {
                koDisposer.add(select2SelectedOption.subscribe(function () {
                    $element.trigger('change');
                }));
            }

            if (lookupKey) {
                var x = _knockout2.default.unwrap(allBindings.value);

                $element.select2('data', _knockout2.default.utils.arrayFirst(obj.data.results, function (item) {
                    return item[lookupKey] === x;
                }));
            }

            _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $element.select2('destroy');
            });
        },
        update: function update(element) {
            (0, _jquery2.default)(element).trigger('change');
        }
    };
});
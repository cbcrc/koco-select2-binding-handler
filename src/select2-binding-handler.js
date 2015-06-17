define([
        'knockout',
        'jquery',
        'disposer'
    ],
    function(ko, $, KoDisposer) {
        'use strict';

        //TODO: Faire en sorte que ce binding applique implicitement les bindings de "options"
        ko.bindingHandlers.select2 = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                var obj = valueAccessor(),
                    allBindings = allBindingsAccessor(),
                    lookupKey = allBindings.lookupKey,
                    select2Options = allBindings.select2Options,
                    select2SelectedOption = allBindings.select2SelectedOption,
                    options = allBindings.options,
                    value = allBindings.value,
                    $element = $(element);

                $element.select2(obj);

                var koDisposer = new KoDisposer();

                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    koDisposer.dispose();
                });

                if (options && ko.isObservable(options)) {
                    koDisposer.add(options.subscribe(function() {
                        $element.removeClass('select2-offscreen').select2(obj);
                    }));
                }

                if (value && ko.isObservable(value)) {
                    koDisposer.add(value.subscribe(function() {
                        $element.removeClass('select2-offscreen').select2(obj);
                    }));
                }

                if (select2Options && ko.isObservable(select2Options)) {
                    koDisposer.add(select2Options.subscribe(function() {
                        $element.removeClass('select2-offscreen').select2(obj);
                    }));
                }

                if (select2SelectedOption && ko.isObservable(select2SelectedOption)) {
                    koDisposer.add(select2SelectedOption.subscribe(function() {
                        $element.trigger('change');
                    }));
                }

                if (lookupKey) {
                    var x = ko.unwrap(allBindings.value);

                    $element.select2('data', ko.utils.arrayFirst(obj.data.results, function(item) {
                        return item[lookupKey] === x;
                    }));
                }

                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    $element.select2('destroy');
                });
            },
            update: function(element) {
                $(element).trigger('change');
            }
        };
    });

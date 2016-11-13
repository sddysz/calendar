/**
 * Calendar App
 *
 * @author Georg Ehrke
 * @copyright 2016 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

describe('EventsEditorDialogService', function () {
	'use strict';

	let EventsEditorDialogService;
	let $uibModal, dismissSpy, renderedPromise, resultPromise, attrSpy, ngElementSpy, addClassSpy, removeClassSpy, widthSpy;
	let $q, $rootScope;

	beforeEach(module('Calendar', function($provide) {
		$uibModal = {};
		$uibModal.open = jasmine.createSpy();

		$provide.value('$uibModal', $uibModal);
	}));

	beforeEach(inject(function (_$q_, _$rootScope_) {
		$q = _$q_;
		$rootScope = _$rootScope_;

		// mixing ES6 Promises and $q ain't no good
		// ES6 Promises will be replaced with $q for the unit tests
		if (window.Promise !== $q) {
			window.Promise = $q;
		}

		dismissSpy = jasmine.createSpy();
		renderedPromise = $q.defer();
		resultPromise = $q.defer();

		$uibModal.open.and.returnValue({
			dismiss: dismissSpy,
			rendered: renderedPromise.promise,
			result: resultPromise.promise
		});

		attrSpy = jasmine.createSpy();
		addClassSpy = jasmine.createSpy();
		removeClassSpy = jasmine.createSpy();
		widthSpy = jasmine.createSpy();
		ngElementSpy = spyOn(angular, 'element').and.returnValue({
			attr: attrSpy,
			addClass: addClassSpy,
			removeClass: removeClassSpy,
			width: widthSpy
		});
	}));

	beforeEach(inject(function (_EventsEditorDialogService_) {
		EventsEditorDialogService = _EventsEditorDialogService_;
	}));

	afterEach(function() {
		ngElementSpy.and.callThrough();
	});

	it ('should open a dialog', () => {
		const scope = {};
		const fcEvent = {
			vevent: {
				calendar: {}
			},
			getSimpleEvent: jasmine.createSpy()
		};
		const positionArray = [];
		const positionCallback = jasmine.createSpy().and.returnValue(positionArray);
		const lockCallback = jasmine.createSpy();
		const unlockCallback = jasmine.createSpy();

		const promise = EventsEditorDialogService.open(scope, fcEvent, positionCallback, lockCallback, unlockCallback);

		let called = false;
		promise.then(() => {
			called = true;
		}).catch(() => {
			fail('was not supposed to fail');
		});

		expect(positionCallback).toHaveBeenCalled();
		expect(lockCallback).toHaveBeenCalled();
		expect(fcEvent.getSimpleEvent).toHaveBeenCalled();
	});

	it ('should submit changes', () => {

	});

	it ('should cancel a dialog', () => {

	});

	it ('should delete an event', () => {

	});

	it ('should proceed to the sidebar', () => {

	});

	it ('should supersede existing dialogs', () => {

	});

	it ('should open a dialog', () => {

	});

	it ('should open a dialog', () => {

	});

	it ('should open a dialog', () => {

	});
});

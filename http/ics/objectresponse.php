<?php
/**
 * ownCloud - Calendar App
 *
 * @author Georg Ehrke
 * @copyright 2014 Georg Ehrke <oc.list@georgehrke.com>
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
namespace OCA\Calendar\Http\ICS;

use OCA\Calendar\Db\TimezoneMapper;
use OCA\Calendar\Utility\ObjectUtility;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;

class ObjectResponse extends DataResponse {

	/**
	 * @param $data
	 * @param TimezoneMapper $timezones
	 * @param int $statusCode
	 */
	public function __construct($data, TimezoneMapper $timezones, $statusCode=Http::STATUS_OK) {
		$dataWithTimezones = ObjectUtility::serializeDataWithTimezones(
			$data,
			$timezones,
			false
		);

		parent::__construct($dataWithTimezones, $statusCode, [
			'Content-type' => 'text/calendar; charset=utf-8',
		]);
	}
}
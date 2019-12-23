/*
 * SonarQube
 * Copyright (C) 2009-2020 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import RadioToggle from 'sonar-ui-common/components/controls/RadioToggle';
import Select from 'sonar-ui-common/components/controls/Select';
import { translate } from 'sonar-ui-common/helpers/l10n';
import { withCurrentUser } from '../../../components/hoc/withCurrentUser';
import { isLoggedIn } from '../../../helpers/users';
import { HotspotFilters, HotspotStatusFilter } from '../../../types/security-hotspots';

export interface FilterBarProps {
  currentUser: T.CurrentUser;
  filters: HotspotFilters;
  onChangeFilters: (filters: Partial<HotspotFilters>) => void;
}

const statusOptions: Array<{ label: string; value: string }> = [
  { value: HotspotStatusFilter.TO_REVIEW, label: translate('hotspot.filters.status.to_review') },
  { value: HotspotStatusFilter.FIXED, label: translate('hotspot.filters.status.fixed') },
  { value: HotspotStatusFilter.SAFE, label: translate('hotspot.filters.status.safe') }
];

export enum AssigneeFilterOption {
  ALL = 'all',
  ME = 'me'
}

const assigneeFilterOptions = [
  { value: AssigneeFilterOption.ME, label: translate('hotspot.filters.assignee.assigned_to_me') },
  { value: AssigneeFilterOption.ALL, label: translate('hotspot.filters.assignee.all') }
];

export function FilterBar(props: FilterBarProps) {
  const { currentUser, filters } = props;
  return (
    <div className="filter-bar display-flex-center">
      <h3 className="huge-spacer-right">{translate('hotspot.filters.title')}</h3>

      {isLoggedIn(currentUser) && (
        <RadioToggle
          className="huge-spacer-right"
          name="assignee-filter"
          onCheck={(value: AssigneeFilterOption) =>
            props.onChangeFilters({ assignedToMe: value === AssigneeFilterOption.ME })
          }
          options={assigneeFilterOptions}
          value={filters.assignedToMe ? AssigneeFilterOption.ME : AssigneeFilterOption.ALL}
        />
      )}

      <span className="spacer-right">{translate('status')}</span>
      <Select
        className="input-medium big-spacer-right"
        clearable={false}
        onChange={(option: { value: HotspotStatusFilter }) =>
          props.onChangeFilters({ status: option.value })
        }
        options={statusOptions}
        searchable={false}
        value={filters.status}
      />
    </div>
  );
}

export default withCurrentUser(FilterBar);
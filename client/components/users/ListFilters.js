import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'

const ListFilters = (props) => {
  const resetFilters = () => { props.resetFilters() },
        handleFormInputChange = (prmFieldname, prmValue) => {
          let filterHash = Object.assign({}, props.list.filters);

          if((prmFieldname === 'user_status_ids') || (prmFieldname === 'user_role_ids')) {
            if(prmValue)
              filterHash[prmFieldname] = Array.from(prmValue, (el) => { return el.value });
            else
              filterHash[prmFieldname] = [];

          } else if((prmFieldname === 'name') || (prmFieldname === 'email')) {
            filterHash[prmFieldname] = String(prmValue.target.value);
          }

          setTimeout(props.setFilters(filterHash));
        };

  return (
    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 hidden-xs">
      <div className="panel panel-default">
        <div className="panel-heading">
          <table className="width100Percent">
            <tbody>
              <tr>
                <td>
                  <h4 className="text-unselectable"><FormattedMessage id="globals.filters" /></h4>
                </td>
                <td className="text-right">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                      <li>
                        <a className="mouseCursorPointer" onClick={resetFilters}>
                          <FormattedMessage id="globals.filters.reset" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel-body">
          <form role="form">
            <div className="form-group">
              <label htmlFor="userListFilters_name">
                <FormattedMessage id="users.filters.labels.name" />
              </label>
              <input  type="text"
                      className="form-control"
                      id="userListFilters_name"
                      autoComplete="off"
                      name="name"
                      value={props.list.filters.name}
                      onChange={handleFormInputChange.bind(this, 'name')} />
            </div>

            <div className="form-group">
              <label htmlFor="userListFilters_email">
                <FormattedMessage id="users.filters.labels.email" />
              </label>
              <input  type="email"
                      className="form-control"
                      id="userListFilters_email"
                      autoComplete="off"
                      name="email"
                      value={props.list.filters.email}
                      onChange={handleFormInputChange.bind(this, 'email')} />
            </div>

            <div className="form-group">
              <label htmlFor="user_role_ids">
                <FormattedMessage id="users.filters.labels.role" />
              </label>
              <Select id="user_role_ids"
                      value={props.list.filters.user_role_ids}
                      placeholder=""
                      backspaceToRemoveMessage=""
                      multi={true}
                      options={props.list.options.user_roles}
                      onChange={handleFormInputChange.bind(this, 'user_role_ids')} />
            </div>

            <div className="form-group">
              <label htmlFor="user_status_ids">
                <FormattedMessage id="users.filters.labels.status" />
              </label>
              <Select name="user_status_ids"
                      value={props.list.filters.user_status_ids}
                      placeholder=""
                      backspaceToRemoveMessage=""
                      multi={true}
                      options={props.list.options.user_status}
                      onChange={handleFormInputChange.bind(this, 'user_status_ids')} />
            </div>
          </form>

        </div>

        <div className="panel-footer">
          <p className="marginBottomZero text-unselectable clearfix">
            <b>{props.list.results}</b>
            <small>&nbsp;/&nbsp;<FormattedMessage id="globals.matches" values={{nunMatches: props.list.matches}} /></small>
          </p>
        </div>

      </div>
    </div>
  )
}

ListFilters.propTypes = {
  list: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired
}

export default ListFilters

import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import InfiniteScroller from '../shared/InfiniteScroller'

const ListItems = (props) => {
  const isSorterFieldActive = (prmSorterField) => (props.list.filters.sorter === prmSorterField) ? 'active' : '',
        loadList = () => { props.loadList() },
        loadMore = () => { props.loadMore() },
        setSelectionBulk = (selType) => { props.setSelectionBulk(selType) },
        resetFilters = () => { props.resetFilters() },
        deleteItemList = () => { props.deleteItemList() },
        setListSorter = (prmField) => {
          const gotFilters = { ...props.list.filters, sorter: prmField };
          props.setFilters(gotFilters);
        };


  return (
    <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <table className="width100Percent">
            <tbody>
              <tr>
                <td className="positionRelative text-center clearfix">
                  <span className="positionAbsolute topZero leftZero pull-left btn-group">
                    <div className="btn-group">
                      <button className="btn btn-default btn-ghost-default dropdown-toggle" type="button" id="selectionListMenu" data-toggle="dropdown" aria-expanded="true">
                        <span className="glyphicon glyphicon-unchecked"></span>
                      </button>
                      <ul className="dropdown-menu width200px" role="menu" aria-labelledby="selectionListMenu">
                        <li role="presentation">
                          <a className="mouseCursorPointer text-unselectable" onClick={setSelectionBulk.bind(this, 'all')}>
                            <FormattedMessage id="globals.menu.select.all" />
                          </a>
                        </li>
                        <li role="presentation">
                          <a className="mouseCursorPointer text-unselectable" onClick={setSelectionBulk.bind(this, 'none')}>
                            <FormattedMessage id="globals.menu.select.none" />
                          </a>
                        </li>
                        <li className="divider"></li>
                        <li role="presentation">
                          <a className="mouseCursorPointer text-unselectable" onClick={setSelectionBulk.bind(this, 'invert')}>
                            <FormattedMessage id="globals.menu.select.invert" />
                          </a>
                        </li>
                        <li className="divider"></li>
                        <li role="presentation">
                          <a className="mouseCursorPointer text-unselectable clearfix" onClick={deleteItemList}>{/*onClick={this.onDeleteItemList}*/}
                            <FormattedMessage id="globals.menu.delete.selection" />
                            <span className="glyphicon glyphicon-trash pull-right" aria-hidden="true"></span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="btn-group">
                      <button className="btn btn-default btn-ghost-primary" onClick={props.createNewItem}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        &nbsp;&nbsp;<FormattedMessage id="users.buttons.new" />
                      </button>
                    </div>
                  </span>



                  <h4 className="text-unselectable">
                    <span className="hidden-xs"><FormattedMessage id="users.list_header" /></span>
                    <span className="visible-xs-*">&nbsp;</span>
                  </h4>

                  <div className="positionAbsolute topZero rightZero pull-right">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right width250px" role="menu">
                      <li role="presentation" className={isSorterFieldActive('users.name ASC')} >
                        <a className="mouseCursorPointer clearfix" onClick={setListSorter.bind(this, 'users.name ASC')} >
                          <FormattedMessage id="globals.filters.sort.name" />
                          <span className="glyphicon glyphicon-sort-by-attributes pull-right" aria-hidden="true"></span>
                        </a>
                      </li>
                      <li role="presentation" className={isSorterFieldActive('users.name DESC')}>
                        <a className="mouseCursorPointer clearfix" onClick={setListSorter.bind(this, 'users.name DESC')} >
                          <FormattedMessage id="globals.filters.sort.name" />
                          <span className="glyphicon glyphicon-sort-by-attributes-alt pull-right" aria-hidden="true"></span>
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <a className="mouseCursorPointer" onClick={resetFilters}>
                          <FormattedMessage id="globals.filters.reset" />
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <a className="mouseCursorPointer" onClick={loadList}>
                          <FormattedMessage id="globals.menu.reload" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {(() => {
          if(props.list.results < 1) {
            return(
              <div className="panel-body">
                <FormattedMessage id="globals.no_results" />
              </div>
            )
          }
        })()}
        <InfiniteScroller loadMore={loadMore}
                          hasMore={(props.list.matches>props.list.results) ? true:false}
                          htmlTag="ul"
                          htmlTagClass="list-group user-list-container">
        {
          props.list.items.map(itemEl => {
            const imgAvatarClass = 'media-object img-circle thumb';

            return(
              <li className="list-group-item" key={itemEl.id}>
                <div className="checkbox-container" onClick={props.setSelectionSingle.bind(this, itemEl.id)}>
                  <input type="checkbox" checked={itemEl._checked} readOnly />
                </div>
                <div className="avatar-container" >
                  <a className="mouseCursorPointer">
                    <img className={imgAvatarClass} src={itemEl.avatar} />
                  </a>
                </div>
                <h3>{itemEl.name}</h3>
                <h4>
                  {itemEl.email}
                </h4>
                <h5 className="text-unselectable">
                  <span className={(itemEl.user_status_id === 1)? 'label label-info' : 'label label-danger'}>{itemEl._user_status_name}</span>
                  &nbsp;&nbsp;&middot;&nbsp;&nbsp;<span className="label label-default">{itemEl._user_role_name}</span>
                </h5>
              </li>
            )
          })
        }
        </InfiniteScroller>
        <div className="panel-footer">
          <p className="marginBottomZero text-unselectable">
            <b>{props.list.results}</b>
            <small>&nbsp;/&nbsp;<FormattedMessage id="globals.matches" values={{nunMatches: props.list.matches}} /></small>
          </p>
        </div>
      </div>
    </div>
  )
}

ListItems.propTypes = {
  list: PropTypes.object.isRequired,
  loadList: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  deleteItemList: PropTypes.func.isRequired,
  createNewItem: PropTypes.func.isRequired,
  setSelectionSingle: PropTypes.func.isRequired,
  setSelectionBulk: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
}

export default ListItems

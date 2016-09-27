import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Store from './Store'
import App from './App'

const userLocale = document.getElementsByTagName('html')[0].getAttribute('lang') || 'en',
      i18n = {
        "formats": {
          "date": {
              "short": {
                  "day": "numeric",
                  "month": "long",
                  "year": "numeric"
              }
          },
          "time": {
              "hhmm": {
                  "hour": "numeric",
                  "minute": "numeric"
              }
          }
        },
        "messages": {
          "nav.users":"Users",
          "users.list_header":"User list",
          "users.buttons.new":"New",
          "users.filters.labels.name":"Name",
          "users.filters.labels.email":"Email",
          "users.filters.labels.role":"Role",
          "users.filters.labels.status":"Status",
          "globals.no_results":"No results found. Check the filters or create a new item.",
          "globals.matches":"{nunMatches, plural,\n  =0 {0 results}\n  =1 {1 result}\n  other {# results}\n}",
          "globals.filters":"Filters",
          "globals.filters.reset":"Reset filters",
          "globals.filters.show":"Show search filters",
          "globals.filters.hide":"Hide search filters",
          "globals.filters.name":"Name",
          "globals.filters.uploader":"Uploader",
          "globals.filters.sort.name":"Sort by name",
          "globals.filters.sort.created_at":"Sort by creation",
          "globals.filters.sort.updated_at":"Sort by update",
          "globals.menu.reload":"Reload list",
          "globals.menu.reload.item":"Reload",
          "globals.menu.select.all":"Select all",
          "globals.menu.select.none":"Select none",
          "globals.menu.select.invert":"Invert selection",
          "globals.menu.delete.selection":"Delete selection"
        }
      };

ReactDOM.render(
  <IntlProvider locale={userLocale} messages={i18n.messages} formats={i18n.formats}>
    <Provider store={Store}>
      <App />
    </Provider>
  </IntlProvider>
  , document.getElementById('webapp-mount-point'))

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React, { useReducer, useState, useContext } from 'react';

const data = [
  { msg: [{ msg_id: 1, msg_text: 'Hello', msg_from_id: 2 }] },
  { friend: [{ friend_id: 2, friend_name: 'John', friend_status: 'online' }] },
  { friend_online: [2] }
];

const DataContext = React.createContext();

function dataReducer(state, action) {
  switch (action.type) {
    case 'add_msg':
      return [
        ...state,
        { msg: [...state.msg, action.payload] }
      ];
    case 'update_msg':
      return state.map(item => {
        if (item.msg) {
          item.msg = item.msg.map(msg => {
            if (msg.msg_id === action.payload.msg_id) {
              return { ...msg, ...action.payload.updates };
            }
            return msg;
          });
        }
        return item;
      });
    case 'delete_msg':
      return state.map(item => {
        if (item.msg) {
          item.msg = item.msg.filter(msg => msg.msg_id !== action.payload);
        }
        return item;
      });
    case 'add_friend':
      return [
        ...state,
        { friend: [...state.friend, action.payload] }
      ];
    case 'update_friend':
      return state.map(item => {
        if (item.friend) {
          item.friend = item.friend.map(friend => {
            if (friend.friend_id === action.payload.friend_id) {
              return { ...friend, ...action.payload.updates };
            }
            return friend;
          });
        }
        return item;
      });
    case 'delete_friend':
      return state.map(item => {
        if (item.friend) {
          item.friend = item.friend.filter(friend => friend.friend_id !== action.payload);
        }
        return item;
      });
    case 'add_friend_online':
      return [
        ...state,
        { friend_online: [...state.friend_online, action.payload] }
      ];
    case 'delete_friend_online':
      return state.map(item => {
        if (item.friend_online) {
          item.friend_online = item.friend_online.filter(friend_id => friend_id !== action.payload);
        }
        return item;
      });
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(dataReducer, data);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {/* Your component structure */}
    </DataContext.Provider>
  );
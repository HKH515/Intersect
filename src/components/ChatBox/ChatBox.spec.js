import React from 'react';
import { shallow } from 'enzyme';
import { SocketIO, Server } from 'mock-socket';
import ChatBox from './index';

jest.useFakeTimers();

describe('Chatbox test', () => {
    let mockSocketServer, mockSocket;

    beforeEach(() => {
        mockSocketServer = new Server('http://localhost:3000');

        mockSocketServer.on('connection', socket => {
            socket.on('msg',message =>{
                socket.emit('msg', message);
            });
        });
    });
})
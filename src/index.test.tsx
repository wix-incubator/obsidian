/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import React, { Component, useState, useEffect } from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import {
  Graph, injectComponent, injectHook, Injectable, Inject, ObjectGraph, Obsidian, Provides,
} from './index';

describe('Sanity', () => {
  it('Exports the API', () => {
    expect(Graph).toBeDefined();
    expect(ObjectGraph).toBeDefined();
    expect(injectHook).toBeDefined();
    expect(injectComponent).toBeDefined();
    expect(Provides).toBeDefined();
    expect(Injectable).toBeDefined();
    expect(Inject).toBeDefined();
    expect(Obsidian.obtain).toBeDefined();
  });

  it('Injects to component', () => {
    const mockLink = 'https://link-to-a-mock-page';

    class PageProvider {
      get page(): string {
        return mockLink;
      }
    }

    interface LinkProps {
      pageProvider: PageProvider;
    }

    @Graph()
    class LinkGraph extends ObjectGraph<LinkProps> {
      @Provides()
      get pageProvider(): PageProvider {
        return new PageProvider();
      }
    }

    function Link({ pageProvider }: LinkProps) {
      return <a href={pageProvider.page}>Click Me</a>;
    }

    const Wrapped = injectComponent(Link, LinkGraph);
    const testInstance = create(<Wrapped />).root;
    const { pageProvider } = testInstance.findByType(Link).props;
    expect(pageProvider.page).toEqual(mockLink);
  });

  it('Injects to hook ', () => {
    const mockFriendId = 'mock_friend_id';

    interface FriendProps {
      friend: Friend;
    }

    class Friend {
      get id() {
        return mockFriendId;
      }
    }

    @Graph()
    class FriendGraph extends ObjectGraph<FriendProps> {
      @Provides()
      get friend(): Friend {
        return new Friend();
      }
    }

    class ChatAPI {
      static subscribers: Map<string, Function> = new Map();
      static subscribeToFriendStatus(friendId: string, statusChangeHandler: Function) {
        ChatAPI.subscribers.set(friendId, statusChangeHandler);
      }

      static unsubscribeFromFriendStatus(friendId: string) {
        ChatAPI.subscribers.delete(friendId);
      }

      static notifyFriendStatus(friendId: string, status: boolean) {
        const handler = ChatAPI.subscribers.get(friendId);
        if (handler) {
          handler({ isOnline: status });
        }
      }
    }

    function useFriendStatus({ friend }) {
      const [isOnline, setIsOnline] = useState(null);

      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }

      useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friend.id, handleStatusChange);
        };
      });

      return { isOnline, friendId: friend.id };
    }

    const injectedUseFriendStatus = injectHook(useFriendStatus, FriendGraph);

    function FriendStatus() {
      const { isOnline, friendId } = injectedUseFriendStatus();

      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? `${friendId} Online` : `${friendId} Offline`;
    }

    let testRenderer!: ReactTestRenderer;
    act(() => {
      testRenderer = create(<FriendStatus />);
    });

    ChatAPI.notifyFriendStatus(mockFriendId, true);
    expect(testRenderer.root.findByType(FriendStatus).children[0]).toEqual('mock_friend_id Online');

    ChatAPI.notifyFriendStatus(mockFriendId, false);
    expect(testRenderer.root.findByType(FriendStatus).children[0]).toEqual('mock_friend_id Offline');
  });

  it('Injects to class', () => {
    const mockTestPropValue = 'mock-test-prop';

    interface TestProps {
      myProp: string;
    }

    @Graph()
    class TestGraph extends ObjectGraph<TestProps> {
      @Provides()
      get myProp(): string {
        return mockTestPropValue;
      }
    }

    @Injectable(TestGraph)
    class TestClass extends Component {
      @Inject private myProp!: string;

      override render() {
        return (
          <>{this.myProp}</>
        );
      }
    }

    const testRenderer = create(<TestClass />);
    expect(testRenderer.toJSON()).toEqual(mockTestPropValue);
  });
});

/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import React, {
  Component,
  useState,
  useEffect,
  ReactElement,
} from 'react';
import { act, render } from '@testing-library/react';
import {
  Graph,
  injectComponent,
  injectHook,
  Injectable,
  Inject,
  ObjectGraph,
  Obsidian,
  Provides,
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
    const mockLink = 'https://link-to-a-mock-page/';

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
      pageProvider(): PageProvider {
        return new PageProvider();
      }
    }

    function Link({ pageProvider }: LinkProps) {
      return <a href={pageProvider.page} data-testid="link">Click Me</a>;
    }

    const Wrapped = injectComponent(Link, LinkGraph);
    const { getByTestId } = render(<Wrapped />);

    const newLocal = getByTestId('link');
    expect(newLocal).toHaveProperty('href', mockLink);
  });

  it('Injects to hook ', async () => {
    const mockFriendId = 'mock_friend_id';

    interface FriendProps {
      friend: Friend;
    }

    interface Status {
      isOnline: boolean;
    }

    class Friend {
      get id() {
        return mockFriendId;
      }
    }

    @Graph()
    class FriendGraph extends ObjectGraph<FriendProps> {
      // @Provides({ name: 'friend' })
      @Provides()
      friend(): Friend {
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

    function useFriendStatus({ friend }: FriendProps) {
      const [isOnline, setIsOnline] = useState<boolean>();

      function handleStatusChange(status: Status) {
        setIsOnline(status.isOnline);
      }

      useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friend.id);
        };
      });

      return { isOnline, friendId: friend.id };
    }

    const injectedUseFriendStatus = injectHook(useFriendStatus, FriendGraph);

    function FriendStatus(): ReactElement {
      const { isOnline, friendId } = injectedUseFriendStatus();

      if (isOnline === null) {
        return <>Loading...</>;
      }
      return <div data-testid="container">{isOnline ? `${friendId} Online` : `${friendId} Offline`}</div>;
    }

    const { findByTestId } = render(<FriendStatus />);
    const container = await findByTestId('container');

    act(() => { ChatAPI.notifyFriendStatus(mockFriendId, true); });
    expect(container.textContent).toBe('mock_friend_id Online');

    act(() => { ChatAPI.notifyFriendStatus(mockFriendId, false); });
    expect(container.textContent).toBe('mock_friend_id Offline');
  });

  it('Injects to class', () => {
    const mockTestPropValue = 'mock-test-prop';

    interface TestProps {
      myProp: string;
    }

    @Graph()
    class TestGraph extends ObjectGraph<TestProps> {
      // @Provides({ name: 'myProp' })
      @Provides()
      myProp(): string {
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

    const { findByText } = render(<TestClass />);
    expect(findByText(mockTestPropValue)).toBeDefined();
  });
});

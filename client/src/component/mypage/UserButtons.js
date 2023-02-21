import React from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 8px;
  margin-top: 1px;
  width: 52px;
  font-size: 12px;

  & > div:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font-weight: bold;
    text-align: left;
    padding-left: 2px;
    margin-bottom: 6px;
    margin-top: 10px;
  }

  & > button {
    padding-left: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 30px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #f3f3f3;
    }

    &:focus {
      background-color: #f58c3f;
      color: #fff;
    }
  }
`;

const SubscriptionButton = styled.button`
  padding-left: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 30px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }

  &:focus {
    background-color: #f58c3f;
    color: #fff;
  }

  & > svg {
    display: inline;
  }
`;

export default function UserButtons() {
  return (
    <Container>
      <Group>
        <span>PERSONAL INFORMATION</span>
        <button type="button">Edit profile</button>
        <button type="button">Delete profile</button>
      </Group>

      <Group>
        <span>SITE SETTINGS</span>
        <button type="button">Edit email settings</button>
        <button type="button">tag watching & ignoring</button>
        <button type="button">community digests</button>
        <SubscriptionButton type="button">
          Question subscriptions <MdOutlineOpenInNew />
        </SubscriptionButton>
      </Group>

      <Group>
        <span>ACCESS</span>
        <button type="button">Your Collectives</button>
        <button type="button">your logins</button>
      </Group>

      <Group>
        <span>APPS & INTERGRATIONS</span>
        <button type="button">Authorized applications</button>
      </Group>
    </Container>
  );
}

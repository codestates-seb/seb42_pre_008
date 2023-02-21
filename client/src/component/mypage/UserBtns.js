import styled from 'styled-components';
import Actives from "./Actives";
import { Routes, Route } from "react-router-dom";


const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  background-color: ${props => props.primary ? '#F97316' : 'transparent'};
  color: ${props => props.primary ? '#FFFFFF' : '#4B5563'};
  border: 2px solid ${props => props.primary ? 'transparent' : '#D1D5DB'};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.primary ? '#F8710F' : '#F3F4F6'};
  }
  &:active {
    background-color: ${props => props.primary ? '#EA580C' : '#F3F4F6'};
    color: ${props => props.primary ? '#FFFFFF' : '#374151'};
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 100%;
`;

function UserBtns() {
  return (
    <Navigation>
      <div className="mx-7">
        <Button primary>Profile</Button>
        <Button>Activity</Button>
        <Button>Saves</Button>
        <Button>Settings</Button>
      </div>
    </Navigation>
  );
}

export default UserBtns;

<Routes>
<Route exact path="/" element={<Actives/>} />
<Route exact path="/actives" element={<Actives />} />
<Route exact path="/settings/*" element={<Actives />} />
</Routes>
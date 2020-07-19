import React from 'react';

interface IProps{
    name?: string;
}

const Header: React.FunctionComponent<IProps> = (props: IProps) =>(
    <h1>Hail and well met, {props.name}!</h1>
);

Header.defaultProps ={
    name: 'fellow traveller',
}

export default Header;
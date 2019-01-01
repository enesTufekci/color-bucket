import * as React from 'react';

import { Normalize } from 'styled-normalize';
import Projects from './screens/Projects';

import './app.css';
import db from '@db';
import { LowdbAsync } from 'lowdb';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 15px;
`;

class App extends React.Component {
  db: LowdbAsync<any> = null as any;
  state = {
    ready: false
  };
  componentDidMount() {
    this.initDb();
  }

  initDb = async () => {
    const DB = await db;
    this.db = DB;
    this.setState({ ready: true });
  };

  render() {
    const { ready } = this.state;
    return (
      ready && (
        <Wrapper>
          <Normalize />
          <Projects db={this.db} />
        </Wrapper>
      )
    );
  }
}

export default App;

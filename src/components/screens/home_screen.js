import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// hocs
import withAuth from '../hocs/with_auth';
import withNavigate from '../hocs/with_navigate';
// components
import { NavBar, Footer, Loader } from '../elements';
import SideBar from '../elements/sidebar';
import ActionBar from '../elements/action_bar';
import TasksGrid from '../elements/tasks_grid';

class HomeScreen extends Component {
    render() {
        const { isFetching, activeList } = this.props;

        return (
            <Fragment>
                {isFetching && <Loader/>}
                <NavBar content={(activeList && activeList.title) || ''} loading={isFetching}/>
                <SideBar/>
                <main>
                    <div className="section-tasks">
                        <ActionBar/>
                        <TasksGrid/>
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

function mapStateToProps({ auth, task }) {
    const { token } = auth;
    const { activeList, isFetching } = task;

    return {
        token,
        activeList,
        isFetching,
    };
}

export default connect(mapStateToProps)(withAuth(withNavigate(HomeScreen)));

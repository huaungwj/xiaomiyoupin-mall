import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SiteTop from '../../component/site-top/site-top';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import FixedBar from '../../component/fixed-bar/fixed-bar';
// import Main from '../main/main';
// import Tr from '../tr/tr';
import Detail from '../detail/detail';
// import Search from '../search/search';
// import PersonalCenter from '../personal-center/personal-center';
// import Login from '../login/login';
const Main = React.lazy(() => import('../main/main'));
const Tr = React.lazy(() => import('../tr/tr'));
const Search = React.lazy(() => import('../search/search'));
const PersonalCenter = React.lazy(() =>
  import('../personal-center/personal-center')
);
const Login = React.lazy(() => import('../login/login'));
// const Detail = React.lazy(() => import('../detail/detail'));

// 路由控制组件
function Home(props) {
  useEffect(() => {
    // console.log(Header);
    document.title = '小米有品';
    // 路由变化时触发
    /* props.history.listen(route => {
             console.log('213213')
         })*/
  }, []);

  return (
    <div>
      {props.location.pathname === '/login' ? null : <SiteTop />}
      {props.location.pathname === '/login' ? null : <Header />}

      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path={'/'} exact component={Main}></Route>
            <Route path={'/detail'} component={Detail}></Route>
            <Route path={'/search'} component={Search}></Route>
            <Route path={'/personal-center'} component={PersonalCenter}></Route>
            <Route path={'/tr'} component={Tr}></Route>
            <Route path={'/login'} component={Login}></Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>

      {props.location.pathname === '/login' ? null : <Footer />}

      {props.location.pathname === '/login' ? null : <FixedBar />}
    </div>
  );
}

export default Home;

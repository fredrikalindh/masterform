import React from 'react'

// import { Switch, Route, Redirect } from 'react-router'

// import Snackbar from '@material-ui/core/Snackbar'

// import routes from './routes'
// import Home from './Home'
// import Info from './Info'
// import Pricing from './Pricing'

// import Signin from '../components/Signin'
// import HomeBar from '../components/HomeBar'
// import Footer from '../components/Footer'

// const pages = [
// 	{
// 		title: 'Careers',
// 		href: routes.careers,
// 		component: <div>Careers</div>
// 	},
// 	{
// 		title: 'Pricing',
// 		href: routes.pricing,
// 		component: <Pricing />
// 	},
// ]

const HomeScreen = () => {
  return (
    <>
      {/* <HomeBar pages={pages} />
			<Signin
				open={loginDialog.open}
				signIn={loginDialog.signIn}
				onClose={() =>
					setLoginDialog(prev => ({ open: false, signIn: prev.signIn }))
				}
				setSnackbar={message => setSnackbar({ open: true, message })}
			/>
			<Snackbar
				autoHideDuration={5000}
				message={snackbar.message}
				open={snackbar.open}
				onClose={() => setSnackbar({ open: false, message: '' })}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			/>
			<Switch>
				<Route path={routes.home} children={<Home />} exact />
				<Route path={routes.info} children={<Info />} />
				<Route path={routes.pricing} children={<Pricing />} />
				<Route path={routes.tou} children={<div>TERMS OF USE</div>} />
				<Redirect to={routes.home} />
			</Switch>
			<Footer /> */}
    </>
  )
}

export default HomeScreen

import React from 'react';
import { Route,IndexRoute } from 'react-router';
import {AltaSite,Inicio,AltaEquipo,AltaPosicion,ModificacionEquipo} from './components/page/index.js';

import Layout from './components/Layout.jsx';

export default (
    <Route path="/" component={Layout}>
            <IndexRoute component={Inicio} />
            <Route path="equipo" component={AltaEquipo} />
            <Route path="site" component={AltaSite} />
            <Route path="posicion" component={AltaPosicion} />
            <Route path="modEquipo" component={ModificacionEquipo} />
    </Route>
);
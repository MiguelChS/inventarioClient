import React from 'react';
import { Route,IndexRoute } from 'react-router';
import {Site,Inicio,AltaEquipo,AltaPosicion,ModificacionEquipo} from './components/index.js';

import Layout from './components/page/Layout.js';

export default (
    <Route path="/inventario" component={Layout}>
            <IndexRoute component={Inicio} />
            <Route path="/equipo" component={AltaEquipo} />
            <Route path="/site" component={Site} />
            <Route path="/posicion" component={AltaPosicion} />
            <Route path="/modEquipo" component={ModificacionEquipo} />
    </Route>
);
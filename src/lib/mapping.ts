import ArcGISMap from '@arcgis/core/Map'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Extent from '@arcgis/core/geometry/Extent';
import { watch } from '@arcgis/core/core/reactiveUtils';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from '@arcgis/core/views/MapView';

interface MapApp {
    view?: MapView;
    savedExtent?: any;
}

const app: MapApp = {}

let handler: IHandle;

export async function init(container: HTMLDivElement, filter: string) {
    if (app.view) {
        app.view.destroy()
    }

    const layer = new FeatureLayer({
        portalItem: {
            id: '848d61af726f40d890219042253bedd7'
        },
        definitionExpression: `fuel1 = '${filter}'`
    });

    const map = new ArcGISMap({
        basemap: 'arcgis-dark-gray',
        layers: [layer]
    })

    const view = new MapView({
        map,
        container
    })

    if (app.savedExtent) {
        view.extent = Extent.fromJSON(app.savedExtent)
    } else {
        layer.when(() => {
            view.extent = layer.fullExtent
        })
    }

    handler = watch(
        () => view.stationary && view.extent,
        () => {
            app.savedExtent = view.extent?.toJSON()
        }
    )

    view.when(async () => {
        await layer.when();
        const element = document.createElement('div');
        element.classList.add('esri-component', 'esri-widget', 'esri-widget--panel', 'p-4')
        element.innerHTML = layer.portalItem.description
        const expand = new Expand({
            content: element,
            expandIconClass: 'esri-icon-description'
        })
        view.ui.add(expand, 'bottom-right')
    });

    app.view = view

    return cleanup;
}

function cleanup() {
    handler?.remove()
    app.view?.destroy()
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreviewCriteriaComponent} from "./preview-criteria/preview-criteria.component";

const routes: Routes = [
    {path: 'preview', component: PreviewCriteriaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CriteriaRoutingModule {
}
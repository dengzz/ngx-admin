import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from "@angular/router";

export class SimpleReuseStrategy implements RouteReuseStrategy {

   shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }

   store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void { }

   shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }

   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null; }

   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
       //console.log("deciding to reuse", "future", future, "current", curr, "return: ", future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params));
       return false;
       //return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params) && JSON.stringify(future.queryParams) == JSON.stringify(curr.queryParams);
   }
}
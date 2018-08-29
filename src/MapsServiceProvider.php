<?php

namespace GoNoWare\Maps;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class MapsServiceProvider extends BaseServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishFiles();
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'maps');

        view()->composer('maps::*', function ($view) {
            $type = $view->type ?? config('vendor.maps.default');
            $enabled = $view->enabled ?? config('vendor.maps.enabled');
            $key = config('vendor.maps.maps.' . $type . '.key');

            // TODO: Warn missing key?

            return $view->with(compact(
                'type',
                'enabled',
                'key'
            ));
        });

        view()->composer('maps::index', function ($view) {
            $lat = $view->lat ?? config('vendor.maps.lat');
            $lng = $view->lng ?? config('vendor.maps.lng');
            $zoom = $view->zoom ?? config('vendor.maps.zoom');
            $markers = $view->markers ?? config('vendor.maps.markers');

            return $view->with(compact(
                'lat',
                'lng',
                'zoom',
                'markers'
            ));
        });
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/maps.php', 'vendor.maps');

        Blade::include('maps::styles', 'mapstyles');
        Blade::include('maps::scripts', 'mapscripts');
        Blade::include('maps::index', 'map');
    }

    /**
     * Publish files.
     *
     * @return void
     */
    private function publishFiles()
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/maps.php' => config_path('vendor/maps.php'),
            ], 'config');
            $this->publishes([
                __DIR__ . '/../public' => public_path('vendor/maps'),
            ], 'public');
            $this->publishes([
                __DIR__ . '/../public' => public_path('vendor/maps'),
            ], 'maps');
        }
    }
}

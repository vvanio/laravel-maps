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
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'maps');

        view()->composer('maps::*', function ($view) {
            if (!isset($view->service)) {
                $view->with('service', config('vendor.maps.default'));
            }
            if (!isset($view->enabled)) {
                $view->with('enabled',  config('vendor.maps.enabled'));
            }
            return $view;
        });
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/maps.php', 'vendor.maps');

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
                __DIR__.'/../config/maps.php' => config_path('vendor/maps.php'),
            ], 'config');
            $this->publishes([
                __DIR__.'/../public' => public_path('vendor/maps'),
            ], 'public');
            $this->publishes([
                __DIR__.'/../public' => public_path('vendor/maps'),
            ], 'maps');
        }
    }
}

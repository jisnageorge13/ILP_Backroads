// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppComponent, config);

// export default bootstrap;

import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';
import { enableProdMode, ApplicationRef, NgModuleRef } from '@angular/core';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

export default function bootstrap(): Promise<ApplicationRef> {
  return platformServer()
    .bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) =>
      moduleRef.injector.get(ApplicationRef)
    );
}

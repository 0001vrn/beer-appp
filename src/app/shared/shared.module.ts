import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CustomHttpService, UrlProviderService } from '../core';
import { BeerService } from './services/beer.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CustomHttpService, UrlProviderService, BeerService],
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SharedModule { }

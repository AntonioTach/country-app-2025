import { Region } from './../../types/region.type';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'region-menu',
  imports: [],
  templateUrl: './region-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionMenuComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
}

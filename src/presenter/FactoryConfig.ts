import { EventEmitter } from 'events';
import Service from '../service/Facade';

export default interface FactoryConfig {
  readonly service: Service;
  readonly observer: EventEmitter;
}

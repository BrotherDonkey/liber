import * as shelljs from 'shelljs';
import { ensureDist } from './generate-navigation';

ensureDist();
shelljs.cp('-R', __dirname + '/../src/fonts', __dirname + '../dist/fonts');
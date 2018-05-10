import path from 'path'

import webpack from 'webpack'
import chalk from 'chalk'

import { clearDir } from './utils'

clearDir(path.join(__dirname, '../dist'))
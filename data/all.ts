import type { Project } from '../types/project'
import { ai } from './ai'
import { auth } from './auth'
import { portfolio } from './portfolio'
import { starter } from './starter'

export const projects: Project[] = [
  ...auth,
  ...ai,
  ...portfolio,
  ...starter
]
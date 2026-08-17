import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { AboutComponent } from './about/about.component';
import { BadUiComponent } from './bad-ui/bad-ui.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'bad-ui',
    component: BadUiComponent
  },
  {
    path: 'chatbot',
    component: ChatbotComponent
  },
  {
    path: 'chat',
    redirectTo: 'chatbot'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about'
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import StudentListview from '@/views/StudentListview.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
    },
    {
      path: '/Student',
      name: 'StudentList',
      component: StudentListview
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to)=>{
        // <-- put API call here
        const id: number = parseInt(to.params.id as string)
          const eventStore = useEventStore()
        return EventService.getEventById(id)
        .then((response) => {
        //need to set up the data for the component
           eventStore.setEvent(response.data)
           console.log(response.data)
        })
        .catch((error)=>{
          if (error.response&&error.response.status === 404){
            return{
              name:'404-resource',
              params: { resource: 'event'}
            }
          }else{
            return { name: 'network-error'}
          }
        })
       
      },
      children: [
        {
          path:'',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          props: true,
          component: EventEditView

        },
        {
          path: 'register',
          name: 'event-register',
          props: true,
          component: EventRegisterView

        },

      ]

    }
    ,
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
      
    }
    ,
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
      
    }
  ],
  scrollBehavior(to, from, savePosition){
    if(savePosition){
      return savePosition
    }else{
      return { top: 0 }
    }
  }
  
})
router.beforeEach(()=>{
  NProgress.start()
})

router.beforeEach(()=>{
  NProgress.done()
})
export default router

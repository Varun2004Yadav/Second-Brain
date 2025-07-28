import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/card'
import { CreateContentModal } from '../components/CreateContentModal'
import {  useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import useContent   from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'




export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
   const { contents, loading, error } = useContent();

 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
 

  return (
    <>
      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2 '>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(true);
        }} />

        <div className='p-4'>

          <div className='flex justify-end gap-4'>

            <Button
              startIcon={<ShareIcon size="sm" />}
              variant='primary'
              size='sm'
              text='Share'
              onClick={async () => {
               const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share` ,{
                  share: true
                },{
                  headers: {
                    'token' : localStorage.getItem('token')
                  } 
                });
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}
            />

            <Button
              startIcon={<PlusIcon size="sm" />}
              variant='secondary'
              size='md'
              text='Add Content'
              onClick={() => {
                setModalOpen(true)
              }}
            />
          </div>

          <div className='flex gap-4 flex-wrap'>
          
           {contents.map(({type,link,title}) => <Card
           type = {type}
           link = {link}
           title= {title}
           />)}
          </div>
        </div>
      </div>
    </>
  )
}


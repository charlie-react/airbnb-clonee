'use client'
import { PuffLoader } from "react-spinners"

const Loader = () => {
  return (
    <div
    className="flex-col flex justify-center items-center h-[70vh]">
        <PuffLoader size={150} color="red"/>
    </div>
  )
}

export default Loader
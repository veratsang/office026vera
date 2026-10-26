import paperclip from '@/assets/office/office-paperclip-pink.png';
import binder from '@/assets/office/office-binder-clip-silver.png';
import paper from '@/assets/office/office-paper-stack.png';
import note from '@/assets/office/office-sticky-note-blue.png';
import './office-stationery.css';

const objects = { paperclip, binder, paper };
export function OfficeObject({kind,className=''}:{kind:keyof typeof objects;className?:string}) {
  return <img src={objects[kind]} className={`office-object ${className}`} alt="" aria-hidden="true" draggable={false}/>;
}
export function OfficeNote({id,status}:{id:'003'|'004';status:string}) {
  return <span className={`office-note office-note-${id}`} aria-hidden="true"><img src={note} alt="" draggable={false}/><span className="office-note-copy"><span>LAB_{id}</span><span>{status}</span></span></span>;
}

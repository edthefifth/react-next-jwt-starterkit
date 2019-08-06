
import React, { Component } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";


let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;
export default class TablePagination extends Component {

   handleClick = (event) => {
     event.preventDefault();
     const {onClick} = this.props;
     onClick(Number(event.target.id));
   }

   getLastPage(){
     const {onClick,totalItems,pageLimit} = this.props;
     return pageLimit > 0 ? Math.ceil(totalItems/pageLimit):0;
   }

   handleLastClick = (event) => {
     event.preventDefault();
     const {onClick} = this.props;
     onClick(this.getLastPage());
   }
   handleFirstClick = (event) => {
     event.preventDefault();
     const {onClick} = this.props;
     onClick(1);
   }

   getPageItemWithLink = (number) => {
     const {currentPage} = this.props;
     const linkKey = `page-link-${number}`;
      return (
        <PaginationItem key={linkKey} active = {(currentPage) === (number) ? true : false} >
             <PaginationLink onClick={this.handleClick} href={number} id={number}>
             {number}
             </PaginationLink>
         </PaginationItem>
      );
   }

   getPageItemNoLink = (value) => {
       const noLinkKey = Math.random()*Number.MAX_SAFE_INTEGER;
       return (
           <PaginationItem key={noLinkKey}>
                <PaginationLink disabled>
               {value}
               </PaginationLink>
           </PaginationItem>
      );
   }


   render() {
     const {onClick, totalItems,pageLimit,currentPage, pageRangeLimit=3 } = this.props;
     // Logic for displaying current todos
      prev  = currentPage > 0 ? (currentPage -1) :0;
      last = this.getLastPage();
      next  = (last === currentPage) ? currentPage : currentPage +1;

     // Logic for displaying page numbers
     let pages = [];

     if(last < 8){
       for (let i = 1; i <=last; i++) {
         pages.push(this.getPageItemWithLink(i));
       }
     } else if(currentPage < 4){
       for (let i = 1; i <=3; i++) {
         pages.push(this.getPageItemWithLink(i));
       }
       pages.push(this.getPageItemNoLink('...'));
       for (let i = (last-3); i <=last; i++) {
         pages.push(this.getPageItemWithLink(i));
       }
     } else {
        pages.push(this.getPageItemWithLink('...'));
        for (let i = (currentPage-1); i <=(currentPage+1); i++) {
          pages.push(this.getPageItemWithLink(i));
        }
        pages.push(this.getPageItemWithLink('...'));
        for (let i = (last-3); i <=last; i++) {
          pages.push(this.getPageItemWithLink(i));
        }
     }

      return (
          <Pagination className='justify-content-center'>
              <PaginationItem>
              { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                  <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
              }
              </PaginationItem>
              <PaginationItem>
              { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                  <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
              }
              </PaginationItem>

                 {pages}

             <PaginationItem>
             {
               currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
               <PaginationLink onClick={this.handleClick} id={currentPage+1} href={currentPage+1}>Next</PaginationLink>
             }
             </PaginationItem>

             <PaginationItem>
             {
               currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
               <PaginationLink onClick={this.handleLastClick} id={last} href={last}>Last</PaginationLink>
             }
             </PaginationItem>
         </Pagination>
     );
   }
 }

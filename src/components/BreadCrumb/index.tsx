import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

import { Link } from "react-router";
const CustomBreadcrumb = (props) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        <CustomBreadcrumbList items={props.items} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const CustomBreadcrumbList = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="font-semibold hover:text-primary"
                to={item.route}
              >
                {item.label}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < items.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ))}
    </>
  );
};

export default CustomBreadcrumb;

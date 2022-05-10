import React, { useEffect, useState } from "react";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai"

const ProductsTable = ({ products }) => {

        const columns = [
            { name: "PRODUCT", uid: "title" },
            { name: "DATES", uid: "dates" },
            { name: "STATUS", uid: "published" },
            { name: "ACTIONS", uid: "actions" },
          ];

          const renderCell = (product, columnKey) => {
            const cellValue = product[columnKey];
            switch (columnKey) {
              case "title":
                return (
                  <User squared src={product.image[0]} name={cellValue} css={{ p: 0 }}>
                    {product.content.length > 50 ? `${product.content.substr(0, 50)}...` : product.content}
                  </User>
                );
              case "dates":
                return (
                  <Col>
                    <Row>
                      <Text b size={14} css={{ tt: "capitalize" }}>
                        {`${new Date(cellValue[0]).toDateString()} - ${new Date(cellValue[1]).toDateString()}`}
                      </Text>
                    </Row>
                  </Col>
                );
              case "published":
                return <StyledBadge type={product.published ? "active" : "paused" as any}>{cellValue}</StyledBadge>;
        
              case "actions":
                return (
                  <Row justify="center" align="center">
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Edit product" color="primary">
                        <IconButton onClick={() => console.log("Edit product", product.id)}>
                          <AiFillEdit size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip
                        content="Delete product"
                        color="error"
                        onClick={() => console.log("Delete product", product.id)}
                      >
                        <IconButton>
                          <AiTwotoneDelete size={20} fill="#FF0080" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Row>
                );
              default:
                return cellValue;
            }
          };

          return (
            <Table
              aria-label="Example table with custom cells"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="none"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === "actions"}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={products}>
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          );
}

export default ProductsTable
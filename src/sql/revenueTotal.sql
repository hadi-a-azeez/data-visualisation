CREATE OR REPLACE FUNCTION revenueTotal()
  RETURNS table(dates date, total bigint)  AS

  $BODY$

      BEGIN
        RETURN QUERY SELECT orders.order_date, SUM(order_products.product_price) as total
        FROM orders,order_products
        WHERE orders.id = order_products.product_order_id
        GROUP BY orders.order_date
        ORDER BY orders.order_date DESC;
      END;

  $BODY$

  LANGUAGE 'plpgsql' 


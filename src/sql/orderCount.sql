CREATE OR REPLACE FUNCTION orderCount()
  RETURNS table(dates date, counts bigint)  AS

  $BODY$

      BEGIN
        RETURN QUERY SELECT order_date,COUNT(*) as count
        FROM orders 
        GROUP BY order_date
        ORDER BY order_date Desc;
      END;

  $BODY$

  LANGUAGE 'plpgsql' 

CREATE OR REPLACE FUNCTION productType()
  RETURNS table(type varchar, counts bigint)  AS

  $BODY$

      BEGIN
        RETURN QUERY SELECT product_type,COUNT(*) as count
        FROM order_products 
        GROUP BY product_type;
      END;

  $BODY$

  LANGUAGE 'plpgsql' 
